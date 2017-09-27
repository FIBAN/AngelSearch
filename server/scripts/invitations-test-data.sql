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

insert into invitations (
    "id",
    angel_id,
    status
) values (
    'dcnWr1xsTVOGKybVHvTZ5w==',
    'hQyM4YDXQ_qIC2kdFfzVEQ==',
    'pending'
), (
    'Y13LEFxMTbiHwlgGgUlTrQ==',
    'WvaGqpLbRX+UXeLc8KDkNg==',
    'pending'
);
