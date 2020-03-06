use actix_web::{web, App, HttpRequest, HttpResponse, HttpServer};
use serde::{Deserialize, Serialize};

extern crate listenfd;
use dotenv;
use listenfd::ListenFd;

#[derive(Serialize, Deserialize)]
struct User {
    name: String,
    email: String,
}

#[derive(Serialize, Deserialize)]
struct Users {
    users: Vec<User>,
}

async fn get_users() -> HttpResponse {
    let mut user_list = Vec::<User>::new();
    for i in 1..10 {
        user_list.push(User {
            name: i.to_string(),
            email: format!("{}@email.com", i.to_string()),
        })
    }
    HttpResponse::Ok().json(user_list)
}

#[actix_rt::main]
async fn main() {
    let mut listenfd = ListenFd::from_env();
    let key = "RUST_SPA_PORT";
    let port = dotenv::var(key).unwrap();
    let mut server = HttpServer::new(|| {
        App::new().service(
            web::scope("/api")
                .route("/test", web::get().to(|| HttpResponse::Ok().body("test")))
                .route("/users", web::get().to(get_users)),
        )
    });

    server = if let Some(l) = listenfd.take_tcp_listener(0).unwrap() {
        server.listen(l).unwrap()
    } else {
        server.bind(format!("127.0.0.1:{}", port)).unwrap()
    };

    server.run().await;
}
