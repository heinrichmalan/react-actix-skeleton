use actix_files as fs;
use actix_web::{ web, App, HttpRequest, HttpServer, HttpResponse };
use std::error::Error;
use std::fs::File;
use std::io::prelude::*;
use std::path::Path;

extern crate listenfd;
use listenfd::ListenFd;
use dotenv;

#[actix_rt::main]
async fn main()  {
    let mut listenfd = ListenFd::from_env();
    let key = "RUST_SPA_PORT";
    let port = dotenv::var(key).unwrap();
    let mut server = HttpServer::new(|| {
        App::new()
        .service(web::scope("/api")
                .route("/test", web::get().to(|| HttpResponse::Ok().body("test"))))
    });

    server = if let Some(l) = listenfd.take_tcp_listener(0).unwrap() {
        server.listen(l).unwrap()
    } else {
        server.bind(format!("127.0.0.1:{}", port)).unwrap()
    };

    server.run().await;
}