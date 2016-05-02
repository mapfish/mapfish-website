from sqlalchemy import Column, Table, types
from sqlalchemy.orm import mapper, column_property
from sqlalchemy.sql import func

from shapely import wkb

from mapfish.sqlalchemygeom import Geometry
from mapfish.sqlalchemygeom import GeometryTableMixIn

from mapfishapp.model.meta import metadata, engine

countries_table = Table(
    'countries', metadata,
    Column('the_geom', Geometry(4326)),
    autoload=True, autoload_with=engine)

class Country(GeometryTableMixIn):
    # for GeometryTableMixIn to do its job the __table__ property
    # must be set here
    __table__ = countries_table
        
    def toFeature(self):
        # overload toFeature to replace the geometry value with the
        # simplified geometry value
        self.the_geom = wkb.loads(self.the_geom_simple.decode("hex"))
        return GeometryTableMixIn.toFeature(self)

mapper(Country, countries_table, properties={
    "the_geom_simple": column_property(
        func.simplify(countries_table.c.the_geom, 2).label("the_geom")
    )
})
