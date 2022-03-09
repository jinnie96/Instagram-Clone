from app.models import db, Comment


def seed_comments():
    comment1 = Comment(user_id = 1, post_id = 12, comment = "Amazing!", edited = False)
    comment2 = Comment(user_id = 2, post_id = 12, comment = "Can't wait for spring. Let's ride soon!", edited = False)
    comment3 = Comment(user_id = 2, post_id = 11, comment = "Wow! That water is so blue!", edited = False)
    comment4 = Comment(user_id = 3, post_id = 10, comment = "I can't wait to check out this cafe.", edited = False)
    comment5 = Comment(user_id = 4, post_id = 10, comment = "I really like that light fixture too! 💡", edited = False)
    comment6 = Comment(user_id = 2, post_id = 9, comment = "Film photography is awesome!", edited = False)
    comment7 = Comment(user_id = 4, post_id = 9, comment = "I recognize this beach 🌊 ", edited = False)

    db.session.add(comment1)
    db.session.add(comment2)
    db.session.add(comment3)
    db.session.add(comment4)
    db.session.add(comment5)
    db.session.add(comment6)
    db.session.add(comment7)

    db.session.commit()

def undo_comments():
    db.session.execute('TRUNCATE comments RESTART IDENTITY CASCADE;')
    db.session.commit()
