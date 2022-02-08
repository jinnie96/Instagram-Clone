"""create all tables

Revision ID: e271790115c1
Revises: ffdc0a98111c
Create Date: 2022-02-04 17:56:25.276507

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'e271790115c1'
down_revision = 'ffdc0a98111c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('comments',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('post_id', sa.Integer(), nullable=True),
    sa.Column('comment', sa.Text(), nullable=False),
    sa.Column('edited', sa.Boolean(), nullable=False),
    sa.ForeignKeyConstraint(['post_id'], ['users.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('follows',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('following', sa.Integer(), nullable=True),
    sa.Column('followers', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['followers'], ['users.id'], ),
    sa.ForeignKeyConstraint(['following'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('posts',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('image', sa.Text(), nullable=False),
    sa.Column('caption', sa.Text(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('likes',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('post_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['post_id'], ['posts.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.add_column('users', sa.Column('first_name', sa.String(length=40), nullable=False))
    op.add_column('users', sa.Column('last_name', sa.String(length=40), nullable=False))
    op.add_column('users', sa.Column('biography', sa.String(), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('users', 'biography')
    op.drop_column('users', 'last_name')
    op.drop_column('users', 'first_name')
    op.drop_table('likes')
    op.drop_table('posts')
    op.drop_table('follows')
    op.drop_table('comments')
    # ### end Alembic commands ###
