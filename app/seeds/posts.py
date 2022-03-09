from app.models import db, Post


def seed_posts():
    post1 = Post(user_id = 4, image = 'https://group-insta-clone.s3.amazonaws.com/b0e21cbbb8f842d7953f806be6d67752.jpg', caption = "To the top!")
    post2 = Post(user_id = 3, image = 'https://group-insta-clone.s3.amazonaws.com/36dcd6232b354faca2b416fb015929ba.jpg', caption = "Attention: New insta-clone account. All forthcoming posts will be from your favorite Station 5 lifeguard!")
    post3 = Post(user_id = 2, image = 'https://group-insta-clone.s3.amazonaws.com/72c6d989f5fb4273bbd16d774e71583a.jpg', caption = "New account! Will be posting about all places in town that are coffee-related. Follow along!")
    post4 = Post(user_id = 4, image = 'https://group-insta-clone.s3.amazonaws.com/f2ca2fbc9bb9426fbe9278266e76c728.jpg', caption = "My steed taking a break out on the trails! Gravel day today 🚵‍♂️💨 💨 💨")
    post5 = Post(user_id = 4, image = 'https://group-insta-clone.s3.amazonaws.com/2b6aec49f5344604aa48809d593587d7.jpg', caption = "Out to a backcountry hut this weekend. Snow season is upon us!")
    post6 = Post(user_id = 3, image = 'https://group-insta-clone.s3.amazonaws.com/88d462f62d584c269be062443ee6e079.jpg', caption = "Morning surf patrol 🏄‍♂️🏄‍♂️🏄‍♂️")
    post7 = Post(user_id = 2, image = 'https://group-insta-clone.s3.amazonaws.com/f3e2e5359b1b4b7e8941b22dd9578103.jpg', caption = "Love the light and open space in this cafe! 💡💡💡")
    post8 = Post(user_id = 4, image = 'https://group-insta-clone.s3.amazonaws.com/b6fdb30263ba4a6b9266ed32d9956c00.jpg', caption = "Yet another gravel day. But with snow!")
    post9 = Post(user_id = 3, image = 'https://group-insta-clone.s3.amazonaws.com/832b30b9660b461689f8baf8144a5ed8.jpg', caption = "Captured on film 35mm.")
    post10 = Post(user_id = 2, image = 'https://group-insta-clone.s3.amazonaws.com/82007bac508343bfb75baa9b4dd18dd8.jpg', caption = "This spot has an amazing color theme. I really dig the green tones + custom light fixture.")
    post11 = Post(user_id = 3, image = 'https://group-insta-clone.s3.amazonaws.com/25604f218ba74dc9aaa816b0be3a04c7.jpg', caption = "Aerial view of today's surf session.")
    post12 = Post(user_id = 4, image = 'https://group-insta-clone.s3.amazonaws.com/b8586984478a41cfb2259fb0a0fd482d.jpg', caption = "Took a trip to a place with no snow + lots of gravel.")

    db.session.add(post1)
    db.session.add(post2)
    db.session.add(post3)
    db.session.add(post4)
    db.session.add(post5)
    db.session.add(post6)
    db.session.add(post7)
    db.session.add(post8)
    db.session.add(post9)
    db.session.add(post10)
    db.session.add(post11)
    db.session.add(post12)

    db.session.commit()

def undo_posts():
    db.session.execute('TRUNCATE posts RESTART IDENTITY CASCADE;')
    db.session.commit()
