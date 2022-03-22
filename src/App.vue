<template>
  <div>
    <Passage>
      <Question>
        On line <a href="#passage-text-ref"></a>, the author talks about
        something. What do they mean?
      </Question>
      <Text every="1">
        <p id="p1">
          "Well, Prince, so Genoa and Lucca are now just family estates of the
          Buonapartes. But I warn you, if you don't tell me that this means war,
          if you still try to defend the infamies and horrors perpetrated by
          that Antichrist--I really believe he is Antichrist--I will have
          nothing more to do with you and you are no longer my friend, no longer
          my 'faithful slave,' as you call yourself! But how do you do? I see I
          have frightened you--sit down and tell me all the news."
        </p>

        <p>
          It was in July, 1805, and the speaker was the well-known Anna Pavlovna
          Scherer, maid of honor and favorite of the Empress Marya Fedorovna.
          With these words she greeted Prince Vasili Kuragin, a man of high rank
          and importance, who was the first to arrive at her reception. Anna
          Pavlovna had had a cough for some days. She was, as she said,
          suffering from la grippe; grippe being then a new word in St.
          Petersburg, used only by the elite.
        </p>

        <p>
          All her invitations without exception, written in French, and
          delivered by a <a id="text-ref"></a>scarlet-liveried footman that
          morning, ran as follows:
        </p>

        <p>
          "If you have nothing better to do, Count (or Prince), and if the
          prospect of spending an evening with a poor invalid is not too
          terrible, I shall be very charmed to see you tonight between 7 and
          10--Annette Scherer."
        </p>

        <p>
          "Heavens! what a virulent attack!" replied the prince, not in the
          least disconcerted by this reception. He had just entered, wearing an
          embroidered court uniform, knee breeches, and shoes, and had stars on
          his breast and a serene expression on his flat face. He spoke in that
          refined French in which our grandfathers not only spoke but thought,
          and with the gentle, patronizing intonation natural to a man of
          importance who had grown old in society and at court. He went up to
          Anna Pavlovna, kissed her hand, presenting to her his bald, scented,
          and shining head, and complacently seated himself on the sofa.
        </p>

        <p>
          "First of all, dear friend, tell me how you are. Set your friend's
          mind at rest," said he without altering his tone, beneath the
          politeness and affected sympathy of which indifference and even irony
          could be discerned.
        </p>

        <p>
          "Can one be well while suffering morally? Can one be calm in times
          like these if one has any feeling?" said Anna Pavlovna. "You are
          staying the whole evening, I hope?"
        </p>

        <p>
          "And the fete at the English ambassador's? Today is Wednesday. I must
          put in an appearance there," said the prince. "My daughter is coming
          for me to take me there."
        </p>
      </Text>
    </Passage>
  </div>
</template>

<script>
import Text from './Text.vue'
import Question from './Question'
import Passage from './Passage'

export default {
  components: {
    Passage,
    Question,
    Text,
  },
}
</script>

<style>
* {
  font-size: 20px;
}
</style>
