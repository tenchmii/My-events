"""merge 36d1b65 and a9fc92e

Revision ID: dc0296d1d9d0
Revises: 36d1b65cc91b, a9fc92e2104c
Create Date: 2025-09-12 14:29:19.156300

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'dc0296d1d9d0'
down_revision: Union[str, Sequence[str], None] = ('36d1b65cc91b', 'a9fc92e2104c')
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    pass


def downgrade() -> None:
    """Downgrade schema."""
    pass
