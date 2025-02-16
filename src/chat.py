from openai import OpenAI

def article_summary(api_key, url):
    client = OpenAI(api_key="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")
    
    
    completion = client.chat.completions.create(
        model="gpt-4o-mini",
        store=True,
        messages=[
            {f"Format all following data in JSON.\n\nKey: date, Value: the date of publication in mm-dd-yy\nKey: city, Value: the city of event\nKey:country, Value: country of city\nKey:latitude, Value: latitude of city\nKey:longitude, Value:longitude of city\nKey: article title, Value: article title in quotes\nKey: summary, Value: 3-4 sentence summary focus on context and impact \n{url}"}
        ]
    )
    
    return completion.choices[0].message

# def test_openai(api_key):
#     client = OpenAI(api_key=api_key)
#     try:
#         completion = client.chat.completions.create(
#             model="gpt-4o-mini",
#             store=True,
#             messages=[
#                 {"role": "user", "content": "You are an assistant summarizing this news article"}
#             ]
#         )
#         print("API key is valid!")
#         print(completion.choices[0].message)
#         return True
#     except:
#         print("API key is invalid!")
#         return False

# if __name__ == "__main__":
#     api_key = "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"
#     test_openai(api_key)