import { configure } from '@kadira/storybook';

function loadStories() {
  require('./stories/field.story');
  require('./stories/select.story');
  require('./stories/toggle.story');
  require('./stories/slider.story');
  require('./stories/button.story');
  require('./stories/form.story');
  require('./stories/styles.story');
}

configure(loadStories, module);
