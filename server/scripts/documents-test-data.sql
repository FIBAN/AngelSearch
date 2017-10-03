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
);

insert into documents (
    "id",
    "name",
    "type",
    download_url,
    parent
) values (
    'xZ3I2jNKRTiQeLIMIhlkAA==',
    'Important document',
    'file',
    'https://example.com/file.pdf',
    null
), (
    'WN8_u2lKQ4Gfic8axp8q2g==',
    'Another important file',
    'file',
    'https://example.com/secret.txt',
    null
);


insert into auth0_users (
    "id",
    angel_id
) values (
    'auth0|59ca588e75ea5d4514ac559b',
    'hQyM4YDXQ_qIC2kdFfzVEQ=='
);