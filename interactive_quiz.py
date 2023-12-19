# Example: reuse your existing OpenAI setup
from openai import OpenAI

# Point to the local server
client = OpenAI(base_url="http://localhost:1234/v1", api_key="not-needed")

completion = client.chat.completions.create(
  model="local-model", # this field is currently unused
  messages=[
    {"role": "system", "content": "Always answer in rhymes."},
    {"role": "user", "content": "Introduce yourself."}
  ],
  temperature=0.7,
)

print(completion.choices[0].message)


class LLMOracle:
  def __init__(self, base_url="http://localhost:1234/v1", temperature=0.7):
    self.client = OpenAI(base_url=base_url, api_key="not-needed")
    self.temperature = temperature
    self.system_prompt = "Below is an instruction that describes a task. Write a response that appropriately completes the request."
  def query_llm(self, template_fstring, arguments_list):
    formatted_string = template_fstring.format(*arguments_list)
    completion = self.client.chat.completions.create(
      model="local-model",  # this field is currently unused
      messages=[
        {"role": "system", "content": self.system_prompt},
        {"role": "user", "content": formatted_string}
      ],
      temperature=self.temperature,
    )
    return completion.choices[0].message.content
#def multiple_choices_prompt_generator(src_txt):

if __name__ == '__main__':
  oracle = LLMOracle()
  src_txt = "Israel's declaration of a state of war marked the start of the most significant military escalation in the region since the Yom Kippur War in 1973. As of 23\u00a0November\u00a02023[update], according to the Gaza Health Ministry, more than 15,000 Palestinians, including over 6,000 children, have been killed, making this the deadliest wars for children in modern times."
  question = oracle.query_llm("given the following passage write a "
                   " multiple choices question about the passage and specify the correct answer.\n passage:{0}",[src_txt])
  print(question)