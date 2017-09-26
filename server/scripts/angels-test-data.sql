insert into angels (
    "id",
    first_name,
    last_name,
    email
) values (
    'hQyM4YDXQ_qIC2kdFfzVEQ==',
    'Teppo',
    'Testi',
    'teppo.testi@example.com'
),(
    'WvaGqpLbRX+UXeLc8KDkNg==',
    'Pekka',
    'Pekaani',
    'pekka.pekaani@example.com'
);

insert into auth0_users (
    "id",
    angel_id
) values (
    'auth0|59ca588e75ea5d4514ac559b',
    'hQyM4YDXQ_qIC2kdFfzVEQ=='
);