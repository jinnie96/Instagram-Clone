from app.models import db, Post

def seed_posts():
    post1 = Post(
        user_id = 1, image = 'https://python-group-project-insta-clone.s3.amazonaws.com/69ef0da56ca24091a2a712ab7b5281c9.jpeg', caption = 'Test Post'
    )

    post2 = Post(
        user_id = 2, image = 'https://python-group-project-insta-clone.s3.amazonaws.com/2703be206de64f77bc836b39cc619f30.png', caption = "Test Post 12"
    )

    db.session.add(post1)
    db.session.add(post2)

    db.session.commit()

def undo_posts():
    db.session.execute('TRUNCATE posts RESTART IDENTITY CASCADE;')
    db.session.commit()
