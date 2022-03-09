from app.models import db, User


def seed_users():
    demo = User(username='demo', first_name='First', last_name='User', email='demo@aa.io', password='password')
    alfy = User(username='alfy-coffee', first_name='Alfy', last_name='Andrews', email='alfy@aa.io', password='password')
    acerola = User(username='acerola-surfs', first_name='Acerola', last_name='Adams', email='acerola@aa.io', password='password')
    arlen = User(username='arlen-bikes', first_name='Arlen', last_name='Atkinson', email='arlen@aa.io', password='password')

    db.session.add(demo)
    db.session.add(alfy)
    db.session.add(acerola)
    db.session.add(arlen)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
