pub mod routes {
    use actix_web::{web, HttpResponse};
    use rand::Rng;
    use serde::{Deserialize, Serialize};

    #[derive(Serialize, Deserialize)]
    struct User {
        name: String,
        email: String,
    }

    #[derive(Serialize, Deserialize)]
    struct Users {
        users: Vec<User>,
    }

    struct Name {
        first_name: String,
        last_name: String,
    }

    #[derive(Serialize)]
    struct Pong {
        data: String,
    }

    fn gen_random_name() -> Name {
        let mut rng = rand::thread_rng();
        let male_names = vec!["Alex", "Friedrich", "Karl", "John", "Johan"];
        let female_names = vec!["Igrit", "Brigitte", "Olga", "Helga"];
        let random_index: usize = rng.gen_range(0, male_names.len());
        let last_name_root = male_names[random_index];
        let last_name: String;
        let first_name: String;
        let male_or_female: usize = rng.gen_range(0, 2);
        if male_or_female == 0 {
            let first_name_index: usize = rng.gen_range(0, female_names.len());
            first_name = String::from(female_names[first_name_index]);
            last_name = format!("{}sdottir", last_name_root);
        } else {
            let first_name_index: usize = rng.gen_range(0, male_names.len());
            first_name = String::from(male_names[first_name_index]);
            last_name = format!("{}sson", last_name_root);
        }
        return Name {
            first_name,
            last_name,
        };
    }

    async fn get_users() -> HttpResponse {
        let mut user_list = Vec::<User>::new();
        for _ in 0..10 {
            let name = gen_random_name();
            user_list.push(User {
                name: format!("{} {}", name.first_name, name.last_name),
                email: format!(
                    "{}.{}@email.com",
                    name.first_name.to_lowercase(),
                    name.last_name.to_lowercase()
                ),
            })
        }
        HttpResponse::Ok().json(user_list)
    }

    pub fn scope() -> actix_web::Scope {
        web::scope("/api")
            .route(
                "/ping",
                web::get().to(|| {
                    HttpResponse::Ok().json(Pong {
                        data: String::from("pong"),
                    })
                }),
            )
            .route("/users", web::get().to(get_users))
    }
}
