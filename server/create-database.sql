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

create table startups (
    "id" text not null primary key,
    lead_angel_id text references angels ("id") on delete set null,
    company_name text not null,
    oneliner text not null,
    industry text not null,
    website text not null,
    city text not null,
    country text not null,
    entrepreneur_name text not null,
    entrepreneur_email text not null,
    entrepreneur_phone text not null,
    round_size_and_open_tickets text not null,
    valuation text not null,
    committed_percentage text not null,
    pitch_deck_link text not null,
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now()
);

create table documents (
    "id" text not null primary key,
    "name" text not null,
    "type" text not null,
    download_url text,
    parent text references documents ("id" ) on delete cascade,
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now()
);

