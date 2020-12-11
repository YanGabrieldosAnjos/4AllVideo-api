CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE IF NOT EXISTS "users"(
    "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP,
    "name" character varying NOT NULL,
    "email" character varying NOT NULL,
    "password" character varying NOT NULL,
    CONSTRAINT "PK_users" PRIMARY KEY (id),
    CONSTRAINT "UQ_email" UNIQUE ("email")
);

CREATE TABLE IF NOT EXISTS "movies"(
    "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP,
    "title" character varying NOT NULL,
    "director" character varying NOT NULL,
    "quantity" BIGINT NOT NULL DEFAULT 0,
    CONSTRAINT "PK_movies" PRIMARY KEY (id) 
);

CREATE TABLE IF NOT EXISTS "rents"(
    "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
    "movie_id" uuid NOT NULL REFERENCES movies(id),
    "user_id" uuid NOT NULL REFERENCES users(id),
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP,
    CONSTRAINT "PK_rents" PRIMARY KEY (id) 
)
