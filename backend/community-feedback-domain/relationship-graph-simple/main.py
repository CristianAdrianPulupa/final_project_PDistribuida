from fastapi import FastAPI
from pydantic import BaseModel
from neo4j import GraphDatabase
import uvicorn

app = FastAPI()

# Conexión a Neo4j
uri = "bolt://neo4j:7687"
user = "neo4j"
password = "NotaryEdu2025"

driver = GraphDatabase.driver(uri, auth=(user, password))

class Relationship(BaseModel):
    source: str
    target: str
    type: str

@app.post("/relationships")
def create_relationship(rel: Relationship):
    with driver.session() as session:
        query = (
            "MERGE (a:Entity {name: $source}) "
            "MERGE (b:Entity {name: $target}) "
            "MERGE (a)-[r:RELATION {type: $type}]->(b) "
            "RETURN a.name AS source, b.name AS target, r.type AS relation_type"
        )
        result = session.run(query, source=rel.source, target=rel.target, type=rel.type)
        record = result.single()
        return record.data() if record else {"error": "No data returned"}

@app.get("/")
def root():
    return {"message": "Neo4j relationship microservice working!"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=3016)
