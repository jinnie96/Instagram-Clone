from app.models import db, Post

def seed_posts():
    post1 = Post(
        user_id = 1, image = 'https://media.npr.org/assets/img/2022/08/31/nannette_streicher_piano-_slide-1cdc7e104f9414ee5d21b5a9e038a0f6a4ca65de.jpg', caption = 'piano'
    )

    post2 = Post(
        user_id = 2, image = 'https://www.dontwasteyourmoney.com/wp-content/uploads/2019/10/AdobeStock_8695995.jpeg', caption = "lights"
    )

    post3 = Post(
        user_id = 3, image = 'https://www.contiki.com/six-two/wp-content/uploads/2015/09/sarthak-navjivan-iTZOPe7BpTM-unsplash.jpg', caption = "party"
    )

    post4 = Post(
        user_id = 3, image = 'https://imageio.forbes.com/specials-images/imageserve/628e7c0d5acb09ecc3d266ae/soccer-new/0x0.jpg?format=jpg&height=1080&width=1920', caption = "soccer"
    )


    db.session.add(post1)
    db.session.add(post2)
    db.session.add(post3)
    db.session.add(post4)

    db.session.commit()

def undo_posts():
    db.session.execute('TRUNCATE posts RESTART IDENTITY CASCADE;')
    db.session.commit()
