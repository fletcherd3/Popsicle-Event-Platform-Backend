INSERT INTO `attendance_status`(`id`, `name`)
VALUES (1, 'accepted');
INSERT INTO `attendance_status`(`id`, `name`)
VALUES (2, 'pending');
INSERT INTO `attendance_status`(`id`, `name`)
VALUES (3, 'rejected');

INSERT INTO `category`(`id`, `name`)
VALUES (1, 'Outdoors & Adventure');
INSERT INTO `category`(`id`, `name`)
VALUES (2, 'Tech');
INSERT INTO `category`(`id`, `name`)
VALUES (3, 'Family');
INSERT INTO `category`(`id`, `name`)
VALUES (4, 'Health & Wellness');
INSERT INTO `category`(`id`, `name`)
VALUES (5, 'Sports & Fitness');
INSERT INTO `category`(`id`, `name`)
VALUES (6, 'Learning');
INSERT INTO `category`(`id`, `name`)
VALUES (7, 'Photography');
INSERT INTO `category`(`id`, `name`)
VALUES (8, 'Food & Drink');
INSERT INTO `category`(`id`, `name`)
VALUES (9, 'Writing');
INSERT INTO `category`(`id`, `name`)
VALUES (10, 'Language & Culture');
INSERT INTO `category`(`id`, `name`)
VALUES (11, 'Music');
INSERT INTO `category`(`id`, `name`)
VALUES (12, 'Movements');
INSERT INTO `category`(`id`, `name`)
VALUES (13, 'LGBTQ');
INSERT INTO `category`(`id`, `name`)
VALUES (14, 'Film');
INSERT INTO `category`(`id`, `name`)
VALUES (15, 'Sci-Fi & Games');
INSERT INTO `category`(`id`, `name`)
VALUES (16, 'Beliefs');
INSERT INTO `category`(`id`, `name`)
VALUES (17, 'Arts');
INSERT INTO `category`(`id`, `name`)
VALUES (18, 'Book Clubs');
INSERT INTO `category`(`id`, `name`)
VALUES (19, 'Dance');
INSERT INTO `category`(`id`, `name`)
VALUES (20, 'Pets');
INSERT INTO `category`(`id`, `name`)
VALUES (21, 'Hobbies & Crafts');
INSERT INTO `category`(`id`, `name`)
VALUES (22, 'Fashion & Beauty');
INSERT INTO `category`(`id`, `name`)
VALUES (23, 'Social');
INSERT INTO `category`(`id`, `name`)
VALUES (24, 'Career & Business');

INSERT INTO `event`(`id`, `title`, `description`, `date`, `image_filename`, `is_online`, `url`, `venue`, `capacity`,
                    `requires_attendance_control`, `fee`, `organizer_id`)
VALUES (1, 'Tamariki book Festival',
        'Check out the Tamariki Book Festival as a writer and/or illustrator of children\'s literature or with your children. Lots of activities and workshops for adults and children. http://www.tamarikibookfestival.co.nz/?fbclid=IwAR1-n-q1E1rArTgRgPwNbIJBVvQ3StYKzbUnF-bHti7g4QT0a13UqiwE-lg. This meetup has been scheduled as a courtesy to let you know this event is going on. Talk amongst yourself after you RSVP to set a time and place to meet',
        '2021-11-16 09:00:00', 'event_1.png', 0, null, 'Rua 333', 99, 0, 0.00, 3);
INSERT INTO `event`(`id`, `title`, `description`, `date`, `image_filename`, `is_online`, `url`, `venue`, `capacity`,
                    `requires_attendance_control`, `fee`, `organizer_id`)
VALUES (2, 'Pigeon Bay Walkway',
        'Meet outside the Pigeon Bay Yacht Club at 10am. Pigeon Bay is about an hour and a half from Christchurch. There is no public transport there. We are also car pooling from Princess Margaret Hospital at 8.15 on the day, so be there if interested. Meet opposite the bus stop directly in front of PMH, but on the side where the river is. \n \n Bring a packed lunch and plenty of water, suitable clothing and sturdy shoes. The track is exposed, so bring sunscreen. \n \n 4-5 hours return. Easy/moderate grade. \n \n Description \n This walkway follows the eastern side of Pigeon bay out to the head of the bay. There are several stiles to cross fences, but the track is a slight incline from sea level up to the end point.\n \n Pigeon Bay Walkway features spectacular coastal views, titoki trees, akeake, and native passion vine/kohia at their southern limits. \n \n It is well signposted and follows a grassy vehicle track of easy grade. \n \n Getting there \n Follow Akaroa Highway to Hilltop, then turn left along Summit Road to the Pigeon Bay Road turnoff. Follow this road to the coast, turn right on to Wharf Road. The walking track starts at the end of Wharf Road, by the yacht club building. \n \n No Dogs. \n Know before you go \n There is significant fall risk at the end of the track. Take care. \n The walkway travels over private land. Be respectful of the farming operations. \n No camping or mountain biking.',
        '2021-11-22 08:15', 'event_2.jpg', 0, null, 'Rua 123', null, 0, 5.00, 1);
INSERT INTO `event`(`id`, `title`, `description`, `date`, `image_filename`, `is_online`, `url`, `venue`, `capacity`,
                    `requires_attendance_control`, `fee`, `organizer_id`)
VALUES (3, 'Beginner JavaScript', 'Learn to be a JavaScript whiz in 2 hours at our Zoom meetup.', '2021-05-06 15:00:00',
        'event_3.jpg', 1, 'https://zoom.us/javascript-training-xyz', null, 25, 1, 0.00, 2);
INSERT INTO `event`(`id`, `title`, `description`, `date`, `image_filename`, `is_online`, `url`, `venue`, `capacity`,
                    `requires_attendance_control`, `fee`, `organizer_id`)
VALUES (4, 'Ethics for Dummies',
        'Come and eat some moral desserts with us while we discuss the all time Ethics greats including Kant, Locke, and Thomas Aquinas.',
        '2021-05-10 12:00:00', 'event_4.jpg', 0, null, 'Chidi\'s office', 6, 1, 0.00, 9);
INSERT INTO `event`(`id`, `title`, `description`, `date`, `image_filename`, `is_online`, `url`, `venue`, `capacity`,
                    `requires_attendance_control`, `fee`, `organizer_id`)
VALUES (5, 'Games night!',
        'Come join us for a night of fun card and board games. Food and drinks are available for order if you want (but not required).\n We\'ll start at 6:30 with a few lighter games and then move into the main event board games after 7.',
        '2021-06-01 18:30:00', 'event_5.jpg', 0, null,
        'Matuku Takotako: Sumner Centre\n14-16 Wakefield Avenue, Sumner\nChristchurch 8081', 20, 1, 0.00, 6);
INSERT INTO `event`(`id`, `title`, `description`, `date`, `image_filename`, `is_online`, `url`, `venue`, `capacity`,
                    `requires_attendance_control`, `fee`, `organizer_id`)
VALUES (6, 'VIP party', 'Expensive party with a huge jumbo shrimp cocktail.', '2021-07-01 22:30:00', 'event_6.gif', 0,
        null, 'The big house', 100, 1, 1000.00, 10);
INSERT INTO `event`(`id`, `title`, `description`, `date`, `image_filename`, `is_online`, `url`, `venue`, `capacity`,
                    `requires_attendance_control`, `fee`, `organizer_id`)
VALUES (7, 'Beach Yoga',
        'Welcome to Beach Yoga at 7:00am near the surf life saving club at Sunny Beach. Enjoy the sunrise and start the day off with an energising morning yoga session.',
        '2021-05-06 07:00:00', 'event_7.jpg', 0, null, 'Sunny Beach', 15, 0, 10.00, 6);
INSERT INTO `event`(`id`, `title`, `description`, `date`, `image_filename`, `is_online`, `url`, `venue`, `capacity`,
                    `requires_attendance_control`, `fee`, `organizer_id`)
VALUES (8, 'Haiku Poem Competition',
        'Haiku Poems: Here\'s the challenge! Write a Haiku poem and win a prize!\n \nA haiku is traditionally a Japanese poem consisting of three short lines that do not rhyme. The origins of haiku poems can be traced back as far as the 9th century. It is a way of looking at the physical world and seeing something deeper, like the very nature of existence. It should leave the reader with a strong feeling or impression.\n \nSome examples from a Haiku master Matsuo Basho\n \nAn old silent pond...\nA frog jumps into the pond,\nsplash! Silence again.\n \nAutumn moonlight-\na worm digs silently\ninto the chestnut.\n \nSeveral core principles are woven into the tapestry of modern haiku. A haiku focuses on one brief moment in time, employs provocative, colourful imagery, and provides a sudden moment of illumination.',
        '2021-07-08 20:00', 'event_8.jpg', 0, null, 'Joe\'s Pub', 30, 0, 0.00, 1);
INSERT INTO `event`(`id`, `title`, `description`, `date`, `image_filename`, `is_online`, `url`, `venue`, `capacity`,
                    `requires_attendance_control`, `fee`, `organizer_id`)
VALUES (9, 'Concert in the Botanical Gardens',
        'Summer concert at the botanical gardens. Bring your friends, a picnic blanket, and a bottle of wine.',
        '2021-12-01 19:00:00', 'event_9.jpg', 0, null, 'CHCH Botanical Gardens', 300, 0, 0.00, 13);
INSERT INTO `event`(`id`, `title`, `description`, `date`, `image_filename`, `is_online`, `url`, `venue`, `capacity`,
                    `requires_attendance_control`, `fee`, `organizer_id`)
VALUES (10, 'East Ward Community Meeting',
        'Air all your grievances about the neighborhood at our online community meeting.', '2021-04-30 18:30:00',
        'event_10.jpg', 1, 'https://zoom.us/community-meeting-xyz', null, 50, 1, 0.00, 14);
INSERT INTO `event`(`id`, `title`, `description`, `date`, `image_filename`, `is_online`, `url`, `venue`, `capacity`,
                    `requires_attendance_control`, `fee`, `organizer_id`)
VALUES (11, 'Dog Walking',
        'Let\'s have some quality time walking our dogs and socializing. Meet at the New Brighton pier.',
        '2021-05-20 09:30:00', 'event_11.jpg', 0, null, 'The New Brighton pier', 10, 0, 0.00, 5);

INSERT INTO `event_category`(`id`, `event_id`, `category_id`)
VALUES (1, 1, 3);
INSERT INTO `event_category`(`id`, `event_id`, `category_id`)
VALUES (2, 1, 6);
INSERT INTO `event_category`(`id`, `event_id`, `category_id`)
VALUES (3, 1, 18);
INSERT INTO `event_category`(`id`, `event_id`, `category_id`)
VALUES (4, 1, 24);
INSERT INTO `event_category`(`id`, `event_id`, `category_id`)
VALUES (5, 2, 1);
INSERT INTO `event_category`(`id`, `event_id`, `category_id`)
VALUES (6, 2, 3);
INSERT INTO `event_category`(`id`, `event_id`, `category_id`)
VALUES (7, 2, 4);
INSERT INTO `event_category`(`id`, `event_id`, `category_id`)
VALUES (8, 2, 5);
INSERT INTO `event_category`(`id`, `event_id`, `category_id`)
VALUES (9, 3, 2);
INSERT INTO `event_category`(`id`, `event_id`, `category_id`)
VALUES (10, 3, 6);
INSERT INTO `event_category`(`id`, `event_id`, `category_id`)
VALUES (11, 3, 24);
INSERT INTO `event_category`(`id`, `event_id`, `category_id`)
VALUES (12, 4, 6);
INSERT INTO `event_category`(`id`, `event_id`, `category_id`)
VALUES (13, 4, 16);
INSERT INTO `event_category`(`id`, `event_id`, `category_id`)
VALUES (14, 5, 15);
INSERT INTO `event_category`(`id`, `event_id`, `category_id`)
VALUES (15, 5, 21);
INSERT INTO `event_category`(`id`, `event_id`, `category_id`)
VALUES (16, 6, 8);
INSERT INTO `event_category`(`id`, `event_id`, `category_id`)
VALUES (17, 6, 19);
INSERT INTO `event_category`(`id`, `event_id`, `category_id`)
VALUES (18, 6, 23);
INSERT INTO `event_category`(`id`, `event_id`, `category_id`)
VALUES (19, 7, 1);
INSERT INTO `event_category`(`id`, `event_id`, `category_id`)
VALUES (20, 7, 4);
INSERT INTO `event_category`(`id`, `event_id`, `category_id`)
VALUES (21, 7, 5);
INSERT INTO `event_category`(`id`, `event_id`, `category_id`)
VALUES (22, 8, 9);
INSERT INTO `event_category`(`id`, `event_id`, `category_id`)
VALUES (23, 8, 12);
INSERT INTO `event_category`(`id`, `event_id`, `category_id`)
VALUES (24, 8, 17);
INSERT INTO `event_category`(`id`, `event_id`, `category_id`)
VALUES (25, 9, 3);
INSERT INTO `event_category`(`id`, `event_id`, `category_id`)
VALUES (26, 9, 11);
INSERT INTO `event_category`(`id`, `event_id`, `category_id`)
VALUES (27, 9, 13);
INSERT INTO `event_category`(`id`, `event_id`, `category_id`)
VALUES (28, 9, 23);
INSERT INTO `event_category`(`id`, `event_id`, `category_id`)
VALUES (29, 10, 12);
INSERT INTO `event_category`(`id`, `event_id`, `category_id`)
VALUES (30, 11, 4);
INSERT INTO `event_category`(`id`, `event_id`, `category_id`)
VALUES (31, 11, 5);
INSERT INTO `event_category`(`id`, `event_id`, `category_id`)
VALUES (32, 11, 20);
INSERT INTO `event_category`(`id`, `event_id`, `category_id`)
VALUES (33, 11, 23);

INSERT INTO `event_attendees`(`id`, `event_id`, `user_id`, `attendance_status_id`)
VALUES (1, 1, 1, 1);
INSERT INTO `event_attendees`(`id`, `event_id`, `user_id`, `attendance_status_id`)
VALUES (2, 1, 2, 1);
INSERT INTO `event_attendees`(`id`, `event_id`, `user_id`, `attendance_status_id`)
VALUES (3, 2, 7, 1);
INSERT INTO `event_attendees`(`id`, `event_id`, `user_id`, `attendance_status_id`)
VALUES (4, 2, 6, 1);
INSERT INTO `event_attendees`(`id`, `event_id`, `user_id`, `attendance_status_id`)
VALUES (5, 1, 7, 1);
INSERT INTO `event_attendees`(`id`, `event_id`, `user_id`, `attendance_status_id`)
VALUES (6, 1, 3, 1);
INSERT INTO `event_attendees`(`id`, `event_id`, `user_id`, `attendance_status_id`)
VALUES (7, 3, 2, 2);
INSERT INTO `event_attendees`(`id`, `event_id`, `user_id`, `attendance_status_id`)
VALUES (8, 3, 4, 2);
INSERT INTO `event_attendees`(`id`, `event_id`, `user_id`, `attendance_status_id`)
VALUES (9, 3, 5, 1);
INSERT INTO `event_attendees`(`id`, `event_id`, `user_id`, `attendance_status_id`)
VALUES (10, 3, 7, 3);
INSERT INTO `event_attendees`(`id`, `event_id`, `user_id`, `attendance_status_id`)
VALUES (11, 4, 8, 1);
INSERT INTO `event_attendees`(`id`, `event_id`, `user_id`, `attendance_status_id`)
VALUES (12, 4, 10, 1);
INSERT INTO `event_attendees`(`id`, `event_id`, `user_id`, `attendance_status_id`)
VALUES (13, 4, 11, 1);
INSERT INTO `event_attendees`(`id`, `event_id`, `user_id`, `attendance_status_id`)
VALUES (14, 5, 1, 1);
INSERT INTO `event_attendees`(`id`, `event_id`, `user_id`, `attendance_status_id`)
VALUES (15, 5, 2, 1);
INSERT INTO `event_attendees`(`id`, `event_id`, `user_id`, `attendance_status_id`)
VALUES (16, 5, 3, 1);
INSERT INTO `event_attendees`(`id`, `event_id`, `user_id`, `attendance_status_id`)
VALUES (17, 5, 4, 1);
INSERT INTO `event_attendees`(`id`, `event_id`, `user_id`, `attendance_status_id`)
VALUES (18, 5, 5, 1);
INSERT INTO `event_attendees`(`id`, `event_id`, `user_id`, `attendance_status_id`)
VALUES (19, 5, 11, 1);
INSERT INTO `event_attendees`(`id`, `event_id`, `user_id`, `attendance_status_id`)
VALUES (20, 5, 12, 1);
INSERT INTO `event_attendees`(`id`, `event_id`, `user_id`, `attendance_status_id`)
VALUES (21, 5, 7, 1);
INSERT INTO `event_attendees`(`id`, `event_id`, `user_id`, `attendance_status_id`)
VALUES (22, 5, 8, 1);
INSERT INTO `event_attendees`(`id`, `event_id`, `user_id`, `attendance_status_id`)
VALUES (23, 5, 6, 1);
INSERT INTO `event_attendees`(`id`, `event_id`, `user_id`, `attendance_status_id`)
VALUES (24, 5, 9, 1);
INSERT INTO `event_attendees`(`id`, `event_id`, `user_id`, `attendance_status_id`)
VALUES (25, 6, 9, 1);
INSERT INTO `event_attendees`(`id`, `event_id`, `user_id`, `attendance_status_id`)
VALUES (26, 6, 8, 1);
INSERT INTO `event_attendees`(`id`, `event_id`, `user_id`, `attendance_status_id`)
VALUES (27, 6, 11, 1);
INSERT INTO `event_attendees`(`id`, `event_id`, `user_id`, `attendance_status_id`)
VALUES (28, 6, 1, 3);
INSERT INTO `event_attendees`(`id`, `event_id`, `user_id`, `attendance_status_id`)
VALUES (29, 6, 2, 3);
INSERT INTO `event_attendees`(`id`, `event_id`, `user_id`, `attendance_status_id`)
VALUES (30, 6, 3, 3);
INSERT INTO `event_attendees`(`id`, `event_id`, `user_id`, `attendance_status_id`)
VALUES (31, 6, 4, 3);
INSERT INTO `event_attendees`(`id`, `event_id`, `user_id`, `attendance_status_id`)
VALUES (32, 6, 5, 3);
INSERT INTO `event_attendees`(`id`, `event_id`, `user_id`, `attendance_status_id`)
VALUES (33, 6, 6, 3);
INSERT INTO `event_attendees`(`id`, `event_id`, `user_id`, `attendance_status_id`)
VALUES (34, 6, 12, 2);
INSERT INTO `event_attendees`(`id`, `event_id`, `user_id`, `attendance_status_id`)
VALUES (35, 6, 13, 2);
INSERT INTO `event_attendees`(`id`, `event_id`, `user_id`, `attendance_status_id`)
VALUES (36, 6, 14, 2);
INSERT INTO `event_attendees`(`id`, `event_id`, `user_id`, `attendance_status_id`)
VALUES (37, 6, 15, 2);
INSERT INTO `event_attendees`(`id`, `event_id`, `user_id`, `attendance_status_id`)
VALUES (38, 6, 16, 2);
INSERT INTO `event_attendees`(`id`, `event_id`, `user_id`, `attendance_status_id`)
VALUES (39, 7, 6, 1);
INSERT INTO `event_attendees`(`id`, `event_id`, `user_id`, `attendance_status_id`)
VALUES (40, 7, 8, 1);
INSERT INTO `event_attendees`(`id`, `event_id`, `user_id`, `attendance_status_id`)
VALUES (41, 7, 12, 1);
INSERT INTO `event_attendees`(`id`, `event_id`, `user_id`, `attendance_status_id`)
VALUES (42, 8, 1, 1);
INSERT INTO `event_attendees`(`id`, `event_id`, `user_id`, `attendance_status_id`)
VALUES (43, 9, 1, 1);
INSERT INTO `event_attendees`(`id`, `event_id`, `user_id`, `attendance_status_id`)
VALUES (44, 9, 2, 1);
INSERT INTO `event_attendees`(`id`, `event_id`, `user_id`, `attendance_status_id`)
VALUES (45, 9, 3, 1);
INSERT INTO `event_attendees`(`id`, `event_id`, `user_id`, `attendance_status_id`)
VALUES (46, 9, 4, 1);
INSERT INTO `event_attendees`(`id`, `event_id`, `user_id`, `attendance_status_id`)
VALUES (47, 9, 5, 1);
INSERT INTO `event_attendees`(`id`, `event_id`, `user_id`, `attendance_status_id`)
VALUES (48, 9, 6, 1);
INSERT INTO `event_attendees`(`id`, `event_id`, `user_id`, `attendance_status_id`)
VALUES (49, 9, 7, 1);
INSERT INTO `event_attendees`(`id`, `event_id`, `user_id`, `attendance_status_id`)
VALUES (50, 9, 8, 1);
INSERT INTO `event_attendees`(`id`, `event_id`, `user_id`, `attendance_status_id`)
VALUES (51, 9, 9, 1);
INSERT INTO `event_attendees`(`id`, `event_id`, `user_id`, `attendance_status_id`)
VALUES (52, 9, 10, 1);
INSERT INTO `event_attendees`(`id`, `event_id`, `user_id`, `attendance_status_id`)
VALUES (53, 9, 11, 1);
INSERT INTO `event_attendees`(`id`, `event_id`, `user_id`, `attendance_status_id`)
VALUES (54, 9, 12, 1);
INSERT INTO `event_attendees`(`id`, `event_id`, `user_id`, `attendance_status_id`)
VALUES (55, 10, 8, 1);
INSERT INTO `event_attendees`(`id`, `event_id`, `user_id`, `attendance_status_id`)
VALUES (56, 10, 9, 1);
INSERT INTO `event_attendees`(`id`, `event_id`, `user_id`, `attendance_status_id`)
VALUES (57, 10, 10, 2);
INSERT INTO `event_attendees`(`id`, `event_id`, `user_id`, `attendance_status_id`)
VALUES (58, 10, 11, 1);
INSERT INTO `event_attendees`(`id`, `event_id`, `user_id`, `attendance_status_id`)
VALUES (59, 10, 12, 3);
INSERT INTO `event_attendees`(`id`, `event_id`, `user_id`, `attendance_status_id`)
VALUES (60, 10, 13, 2);
INSERT INTO `event_attendees`(`id`, `event_id`, `user_id`, `attendance_status_id`)
VALUES (61, 10, 14, 1);
INSERT INTO `event_attendees`(`id`, `event_id`, `user_id`, `attendance_status_id`)
VALUES (62, 10, 15, 1);
INSERT INTO `event_attendees`(`id`, `event_id`, `user_id`, `attendance_status_id`)
VALUES (63, 10, 16, 1);
INSERT INTO `event_attendees`(`id`, `event_id`, `user_id`, `attendance_status_id`)
VALUES (64, 10, 17, 2);
INSERT INTO `event_attendees`(`id`, `event_id`, `user_id`, `attendance_status_id`)
VALUES (65, 11, 5, 1);









