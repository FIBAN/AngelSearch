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

insert into startups (
    "id",
    lead_angel_id,
    company_name,
    oneliner,
    industry,
    website,
    city,
    country,
    entrepreneur_name,
    entrepreneur_email,
    entrepreneur_phone,
    round_size_and_open_tickets,
    valuation,
    committed_percentage,
    pitch_deck_link
) values (
    'twBXSOINRJakVoSgINyGKw==',
    'hQyM4YDXQ_qIC2kdFfzVEQ==',
    'Startup oy',
    'Save the cheerleader. Save the world.',
    'Business',
    'http://example.com',
    'Helsinki',
    'Finland',
    'John Doe',
    'john@example.com',
    '123456789',
    '',
    '1 billion dollars',
    '50',
    'http://example.com/pitchdeck'
);

insert into auth0_users (
    "id",
    angel_id
) values (
    'auth0|59ca588e75ea5d4514ac559b',
    'hQyM4YDXQ_qIC2kdFfzVEQ=='
);