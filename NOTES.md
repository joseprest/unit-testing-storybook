# User Stories

- As a test creator, I would like to create a reference to a highlighted part of the reading passage.
- The reading passage is a text that students read and later answer questions on.
- For example the reading passage would be on the left and the line reference would be in the question on the right side.

Example from the Student/Test Taker point of view:
- highlight + lines show the relationship between the ReadingPassageReference component in the Question
- ![](https://firebasestorage.googleapis.com/v0/b/firescript-577a2.appspot.com/o/imgs%2Fapp%2Fmy-testing%2Fm9CSoXpVDH.png?alt=media&token=078dae69-ccaa-45c1-b53a-a652dbb6857f)
- The linked page reference would be updated if the width of the content div is updated so the line numbers would line up.

- When editing the question using TinyMCE the user would like to be able to click the "Create Passage Reference" button (implemented as a TinyMCE plugin) to insert a page reference to the currently highlighted text. If the text was not already highlighted, alert the user to try again with selected text.

# Example

Reading Passage
---

"Well, Prince, so Genoa and Lucca are now just family estates of the Buonapartes. But I warn you, if you don't tell me that this means war, if you still try to defend the infamies and horrors perpetrated by that Antichrist--I really believe he is Antichrist--I will have nothing more to do with you and you are no longer my friend, no longer my 'faithful slave,' as you call yourself! But how do you do? I see I have frightened you--sit down and tell me all the news."

Question Editor:
---

One line #{INSERT LINE REFERENCE} "scarlet-liveried" most nearly means. ??

A
B
C
D


User clicks INSERT LINE REFERENCE

they need to highlight the Reading Passage, click OK or SAVE, then the Reading Passage is modified with the reference <a id=“….”>


---

- cleanup + add test cases
- deserialize the HTML data into Vue Component for the line reference
- Create TinyMCE plugin for references

TASK:

To identify the storage format for the <PassageReference> in the HTML stored
in the database.

On line <a href="#passageRef:text-ref"/>, the author talks about something.

=> replaced with

On line <PassageReference refId="text-ref"/>, the author talks about something.

-  in the PassageText line mode the PassageReference refers to line

---

User creates a question in TinyMCE. TinyMCE works with plain HTML. TinyMCE has a button called “Create Reading Passage Reference”. Generates simple html for a line reference like:  <a data-line-ref=“”/>


Question
	render() =>
		get the HTML of the default slot
		replace the querySelectorAll(‘a[data-line-ref]’) with Vue components for <LineReference refId=“”>
	TODO
restrictions or goals:
the line number should be dynamic based on the end-users screen height and width (of text)

store the reference to the reference in the database
word count before the instance
findText whole text of 




TODO:

implement the <ReadingPassageProvider> </ReadingPassageProvider>, move from App.vue
check the terminology for Vue-ness?
example or reference to official Vue naming recommendations for provide/inject container
<Question> needs to render the reference ID
needs to work with TinyMCE <a id=“xcbxcbxcb”/>  or web component
https://www.tiny.cloud/docs/integrations/webcomponent/
TinyMCE - need a way to create the page reference
eitehr: re-use an existing plugin
OR: create a custom plugin


<div id="app"/>
<ReadingPassageProvider>
  ....
  <ReadingPassage>
    <p><line-reference-provider refId="blah"/>1</p>
    <p>2</p>
  </ReadingPassage>
  ....
  <Question>
    <line-reference refId="blah">
  </Question>
</ReadingPassageProvider>