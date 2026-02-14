def get_template(subject: str) -> str:
    templates = {
        "OS": "Operating Systems concepts including process management, memory management, and file systems.",
        "DBMS": "Database Management Systems principles, SQL, normalization, and transaction management.",
        "CN": "Computer Networks layers, protocols, and network security.",
        "DSA": "Data Structures and Algorithms analysis, implementation, and complexity.",
        "SE": "Software Engineering methodologies, SDLC, testing, and project management.",
        "SPCC": "System Programming and Compiler Construction phases, parsing, and code generation.",
    }
    return templates.get(subject, "General Engineering concepts.")
