"""merge heads

Revision ID: 36d1b65cc91b
Revises: 296e1cb480f0, 3ba62beace9a
Create Date: 2025-09-11 12:20:57.967634

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '36d1b65cc91b'
down_revision: Union[str, Sequence[str], None] = ('296e1cb480f0', '3ba62beace9a')
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    pass


def downgrade() -> None:
    """Downgrade schema."""
    pass
