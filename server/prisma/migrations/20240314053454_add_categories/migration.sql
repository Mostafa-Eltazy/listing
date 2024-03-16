-- This is an empty migration.
INSERT INTO "categories" ("name", "slug", "created_at", "updated_at")
VALUES ('Apartment', 'apartment', NOW(), NOW()),
       ('Villa', 'villa', NOW(), NOW()),
       ('Duplex', 'Duplex', NOW(), NOW()),
       ('TownHouse', 'townhouse', NOW(), NOW()),
       ('Penthouse', 'penthouse', NOW(), NOW()),
       ('Studio', 'studio', NOW(), NOW()),
       ('Condo', 'condo', NOW(), NOW()),
       ('House', 'house', NOW(), NOW()),
       ('Other', 'other', NOW(), NOW());