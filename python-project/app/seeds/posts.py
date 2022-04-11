from app.models import db, Post

def seed_posts():
    post1 = Post(
        user_id=1, image='https://python-group-project-insta-clone1.s3.amazonaws.com/dog-3071334_960_720.jpg', caption='Dog'
    )

    post2 = Post(
        user_id=2, image='https://python-group-project-insta-clone1.s3.amazonaws.com/frog-2240764_960_720.jpg', caption="Frog"
    )

    post3 = Post(
        user_id=3, image='https://python-group-project-insta-clone1.s3.amazonaws.com/key-3348307_960_720.jpg', caption="Key"
    )

    post4 = Post(
        user_id=3, image='https://python-group-project-insta-clone1.s3.amazonaws.com/pyrenees-351266_960_720.jpg', caption="Space"
    )


    db.session.add(post1)
    db.session.add(post2)
    db.session.add(post3)
    db.session.add(post4)

    db.session.commit()

def undo_posts():
    db.session.execute('TRUNCATE posts RESTART IDENTITY CASCADE;')
    db.session.commit()
