// use server_security::start;
// use std::process::exit;

// #[tokio::main]
// async fn main() {
//     let args: Vec<String> = std::env::args().map(|x| format!("{}", x)).collect();
//     if args.len() < 2 {
//         println!("lost config path error");
//         exit(-1);
//     }
//     start(format!("{}", args[1])).await.unwrap();
// }


use std::thread;
use std::net::{TcpListener, TcpStream, Shutdown};
use std::io::{Read, Write};

fn main() {
    // Listen on port 8080. As a reverse proxy the request comes here first
    // In the practical case, this will be port 80
    let server = TcpListener::bind("127.0.0.1:7700").unwrap();
    for stream in server.incoming() {
        match stream {
            Ok(stream) => {
                thread::spawn(move || {
                    // stream.set_nonblocking(true).expect("set_nonblocking call failed");
                    
                    // This function writes the stream to the destination of the proxy(web application), 
                    // then reads the response from the destination (web app)
                    // then writes the response to the listener at port 8080 here
                    serve(stream);
                });
            }
            Err(e) => {
                println!("Error: {}", e);
            }
        }
    }
    drop(server);
}

fn serve(stream: TcpStream) {
    // Connect to the already running web application. In my case, I was running a local installtion 
    // of Drupal using Drupal VM (i.e., vagrant, VirtualBox) on local IP 192.168.88.88:80
    let app_stream = TcpStream::connect("127.0.0.1:7701").unwrap();
    // app_stream.set_nonblocking(true).expect("set_nonblocking call failed");
    
    // Closure function that takes a stream and a buffer
    // and tries to write the buffer into the stream
    let write_stream = |mut s: &TcpStream, b: [u8; 32_768], size: usize| {
        s.write(&b[0..size]).expect("Unable to write.");
    };
    
    // Closure function to shutdow a stream prematurely
    let shutdown_stream = |s: &TcpStream, rw :Shutdown | {
        s.shutdown(rw).unwrap();
    };
    
    // Closure function to handle error of a stream connection
    let handle_error = |s: &TcpStream| {
        println!("An error occurred, terminating connection with {}", s.peer_addr().unwrap());
        shutdown_stream(s, Shutdown::Both);
    };
    
    // Closure function that reads from one stream and writes to another
    let listen_and_serve = |mut s_read: &TcpStream, s_write: &TcpStream| {
        let mut buffer = [0 as u8; 32_768];
        match s_read.read(&mut buffer) {
            Ok(size) => {
                if size != 0 {
                    write_stream(&s_write, buffer, size);
                    shutdown_stream(&s_write, Shutdown::Write);
                    true
                }
                else {
                    false
                }
            },
            Err(_) => {
                handle_error(s_read);
                false
            }
        }
    };
    
    
    // Here's where the stuff happens
    // stream is the listening server on 8080
    // app_stream is the stream connected to the web application that we are
    // trying to proxy
    //
    // First while, reads from user when you access localhost at 8080
    //   and writes to app_stream. i.e., request from browser send to web application
    // Second while, reads from application and writes to user stream 
    //   or server stream at 8080. i.e., response from application send to 8080 and appears on browser
    while listen_and_serve(&stream, &app_stream) {
        while listen_and_serve(&app_stream, &stream) {
            shutdown_stream(&stream, Shutdown::Read);
        }
    }
    drop(app_stream);
}