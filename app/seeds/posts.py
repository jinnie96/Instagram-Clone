from app.models import db, Post

def seed_posts():
    post1 = Post(
        user_id = 1, image = 'https://app-amazon-pro.s3.us-west-2.amazonaws.com/piano.jpeg', caption = 'piano'
    )

    post2 = Post(
        user_id = 2, image = 'https://app-amazon-pro.s3.us-west-2.amazonaws.com/lights.jpeg', caption = "lights"
    )

    post3 = Post(
        user_id = 3, image = 'https://app-amazon-pro.s3.us-west-2.amazonaws.com/party.jpeg', caption = "party"
    )

    post4 = Post(
        user_id = 3, image = 'https://app-amazon-pro.s3.us-west-2.amazonaws.com/imageedit_2_4521847632.jpg', caption = "hey"
    )


    db.session.add(post1)
    db.session.add(post2)
    db.session.add(post3)
    db.session.add(post4)

    db.session.commit()

def undo_posts():
    db.session.execute('TRUNCATE posts RESTART IDENTITY CASCADE;')
    db.session.commit()
