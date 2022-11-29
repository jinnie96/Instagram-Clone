from app.models import db, Comment

def seed_comments():
    comment1 = Comment(
        user_id = 1, post_id = 1, comment = 'Cool', edited = False
    )
    comment2 = Comment(
        user_id = 2, post_id = 1, comment = "Cool post", edited = False
    )

    comment3 = Comment(
        user_id = 3, post_id = 2, comment = 'Coooool', edited = False
    )

    db.session.add(comment1)
    db.session.add(comment2)
    db.session.add(comment3)

    db.session.commit()

def undo_comments():
    db.session.execute('TRUNCATE comments RESTART IDENTITY CASCADE;')
    db.session.commit()
