from app.models import db, Post

def seed_posts():
    post1 = Post(
        user_id = 1, image = 's3://python-group-project-insta-clone/Images/User1/Photo1.jpeg', caption = 'Test Post'
    )

    post2 = Post(
        user_id = 2, image = 's3://python-group-project-insta-clone/Images/User1/Photo4.jpeg', caption = "Test Post 12"
    )

    db.session.add(post1)
    db.session.add(post2)

    db.session.commit()

def undo_posts():
    db.session.execute('TRUNCATE posts RESTART IDENTITY CASCADE;')
    db.session.commit()
