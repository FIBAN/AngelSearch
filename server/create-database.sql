create table angels (
    "id" text not null primary key,
    first_name text not null,
    last_name text not null,
    email text not null unique,
    phone text,
    city text,
    country text,
    bio text,
    linkedin text,
    network text,
    investment_level integer,
    industries text[] not null default '{}',
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now()
);

create table invitations (
    "id" text not null primary key,
    angel_id text not null references angels ("id") on delete cascade,
    status text not null default 'pending',
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now()
);

create table auth0_users (
    "id" text not null primary key,
    angel_id text not null references angels ("id") on delete cascade,
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now()
);

