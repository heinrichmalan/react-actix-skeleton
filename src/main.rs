use actix_web::{App, HttpServer};
extern crate listenfd;
use dotenv;
use listenfd::ListenFd;

mod api;

#[actix_rt::main]
async fn main() {
    let mut listenfd = ListenFd::from_env();
    let key = "RUST_SPA_PORT";
    let port = dotenv::var(key).unwrap();
    let mut server = HttpServer::new(|| App::new().service(api::routes::scope()));

    server = if let Some(l) = listenfd.take_tcp_listener(0).unwrap() {
        server.listen(l).unwrap()
    } else {
        server.bind(format!("127.0.0.1:{}", port)).unwrap()
    };

    let res = server.run();
    match res.await {
        Ok(res) => res,
        Err(error) => panic!("Error running the server: {:?}", error),
    }
}
