import * as React from 'react';

import { canvasTools } from '../../../../utilities/types';

import classNames from 'classnames';
import Card from '../../../../components/Card';
import Stack from '../../../../components/Stack';
import Heading from '../../../../components/Typography/Heading';
import Icon from '../../../../components/Icon';

import './Tools.scss';

interface Props {
  tool: canvasTools;
  currentCanvasTool(currentTool: canvasTools): void;
}

export default class App extends React.Component<Props, {}> {
  public render() {
    const { tool } = this.props;

    const capitalize = (word: string) =>
      word.charAt(0).toUpperCase() + word.slice(1);

    const toolMarkup = (name: canvasTools) => {
      const toolClasses = classNames('Tool', tool == name && 'Tool--Selected');

      return (
        <div className={toolClasses}>
          <Stack alignment='center'>
            <Icon name='penguin' size='small' />
            {capitalize(name)}
          </Stack>
        </div>
      );
    };

    return (
      <Card openEdges={['left']}>
        <Card.Section>
          <div className='Container'>
            <Stack vertical>
              <Heading>Tools</Heading>
              <Stack vertical alignment='center'>
                {toolMarkup('body')}
              </Stack>
            </Stack>
          </div>
        </Card.Section>
      </Card>
    );
  }
}
