BEGIN;

TRUNCATE
  stories,
  images,
  users
  RESTART IDENTITY CASCADE;

INSERT INTO images (link, alt)
VALUES
  ('https://bedtime-images.s3.us-west-1.amazonaws.com/1556344646856_img_1.jpg', 'story 1 cover'),
  ('https://bedtime-images.s3.us-west-1.amazonaws.com/1556578398932_img_6.jpg', 'story 2 cover'),
  ('https://bedtime-images.s3.us-west-1.amazonaws.com/1556578378639_img_4.jpg', 'story 3 cover'),
  ('https://bedtime-images.s3.us-west-1.amazonaws.com/1556578518243_img_3.jpg', 'story 4 cover'),
  ('https://bedtime-images.s3.us-west-1.amazonaws.com/1556344646856_img_1.jpg', 'story 1 image'),
  ('https://bedtime-images.s3.us-west-1.amazonaws.com/1556344646856_img_1.jpg', 'story 2 image'),
  ('https://bedtime-images.s3.us-west-1.amazonaws.com/1556344646856_img_1.jpg', 'story 3 image');

INSERT INTO users (user_name, password, email, first_name, last_name)
VALUES
  ('johndoe', '$2a$04$5DS6X/TYcyMHqyoB3yAeyOjJx6ELQyT6G9DEFPeuOe4tp3YgYdDdm', 'johndoe@gmail.com', 'john', 'doe'),
  ('janesmith', '$2a$04$m63r3lAvpMB62cxH/YTiPOcVU8L5sUlPmmR.3qIX7Ro/YWmKKYjkC', 'janesmith@gmail.con', 'jane', 'smith'),
  ('olegkan', '$2a$04$6u/FzBvuaDilXDwgNUGvgegP.dHdsg.TyKTqP1yP1MUNPFkkCnz86', 'olegkan@gmail.con', 'oleg', 'kan'),
  ('guest', '$2a$04$DUKQY.R3ggoCKqy104t0ZuAuGAlt3S0q3DekPtQsKGHd1S4sIJ65y', 'guest@guest.guest', 'Hello', 'Guest!');

COMMIT;