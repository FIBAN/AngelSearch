create table angels (
    "id" text not null primary key,
    auth0_id text unique,
    first_name text not null,
    last_name text not null,
    email text not null unique,
    phone text,
    city text,
    country text,
    bio text
);

create table invitations (
    "id" text not null primary key,
    angel_id text not null references angels ("id") on delete cascade,
    status text not null default 'pending'
);

create table auth0_users (
    "id" text not null primary key,
    angel_id text not null references angels ("id") on delete cascade
);

create table angel_industries (
    "id" text not null primary key,
    angel_id text not null references angels ("id") on delete cascade,
    industry text not null,
    unique (angel_id, industry)
)

