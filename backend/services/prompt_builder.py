def build_prompt(question: str, subject: str, marks: int) -> str:
    from .subject_templates import get_template
    
    template = get_template(subject)
    
    prompt = f"""
Subject: {subject}
Marks: {marks}
Question: {question}

Context: {template}

Task: Provide a comprehensive answer suitable for a {marks}-mark question in an engineering exam.
"""
    return prompt
