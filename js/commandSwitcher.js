class Button {
  constructor(element) {
    this.element = element;
    this.isActive = false;
  }

  setState(state) {
    switch (state) {
      case true:
        this.isActive = true;
        this.element.classList.add('active');
        break;
      case false:
        this.isActive = false;
        this.element.classList.remove('active');
        break;
    }
  }

  onClick(buttons) {
    for (const button of buttons) {
      button.setState(false);
    }
    this.setState(true);
    console.log('test');
  }
}

class Command {
  constructor(element) {
    this.element = element;
    this.hidden = true;
  }

  show() {
    this.element.classList.remove('hide');
  }

  hide() {
    this.element.classList.add('hide');
  }

  check(tab, commandTypes) {
    for (const commandType of commandTypes) {
      if (
        commandTypes[tab] == commandType &&
        this.element.classList.contains(commandType)
      ) {
        this.show();
        return;
      } else {
        this.hide();
      }
    }
  }
}

function main() {
  const commandTypes = ['ai', 'chr', 'fun', 'mod', 'mus', 'img','sfw', 'nsfw', 'util', 'sf'];

  const commandElements = document.getElementsByClassName('command-card');
  const commands = [];
  const buttonElements = document.getElementsByClassName(
    'command-filter-menu-item'
  );
  const buttons = [];
  const searchBar = document.getElementById('searchbar');

  let tab = 0;

  for (const command of commandElements) {
    commands.push(new Command(command));
  }

  for (const button of buttonElements) {
    buttons.push(new Button(button));
  }

  buttons[tab].setState(true);

  for (const button of buttons) {
    button.element.addEventListener('click', () => {
      tab = buttons.indexOf(button);
      for (const button2 of buttons) {
        button2.setState(false);
      }
      button.setState(true);

      for (const command of commands) {
        command.check(tab, commandTypes);
      }
    });
  }

  for (const command of commands) {
    command.check(tab, commandTypes);
  }

  searchBar.addEventListener('input', () => {
    value = searchBar.value.toLowerCase();
    if (value == '') {
      for (const button of buttons) {
        for (const command of commands) {
          command.check(tab, commandTypes);
        }
      }
      return;
    }
    for (command of commands) {
      const commandName = command.element
        .getElementsByTagName('h3')[0]
        .innerHTML.toLowerCase();
      if (commandName.includes(value)) {
        command.show();
      } else {
        command.hide();
      }
    }
  });
}

main();
