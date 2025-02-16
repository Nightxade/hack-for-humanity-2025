from openai import OpenAI

def article_summary(apikey, content):
    client = OpenAI(api_key=apikey)
    
    
    completion = client.chat.completions.create(
        model="gpt-4o-mini",
        store=True,
        messages=[
            {"role": "user", "content": f"Format all following data in JSON. Do NOT output anything else besides the JSON. This includes the markdown formatting, please output raw JSON.\n\nKey: date, Value: the date the article was published in the format YYYY-MM-DD\nKey: city, Value: the city of event\nKey: country, Value: country of city\nKey: latitude, Value: latitude of city (5 decimals)\nKey: longitude, Value:longitude of city (5 decimals)\nKey: title, Value: article title in quotes\nKey: content, Value: 3-4 sentence summary focus on context and impact\nKey: category, Value: one of the following strings, selected based on which category best describes the article: ['Natural disaster', 'Human rights', 'Health and disease', 'Conflict of war', 'Environmental'] \nHere is the article in raw HTML: {content}"}
        ]
    )
    
    return completion.choices[0].message.content