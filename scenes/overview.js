// overview.js
// Flow

import React, { Component } from 'react';
import { Container, Content, Footer, FooterTab, Button, Icon, Text } from 'native-base';

export default class FooterTabsExample extends Component {
    render() {
        return (
            <Container>
                <Content />
                
                <Footer >
                    <FooterTab>
                        <Button>
                            <Icon name="podium" />
                        </Button>
                        <Button>
                            <Icon name="camera" />
                        </Button>
                        <Button active>
                            <Icon active name="navigate" />
                        </Button>
                        <Button>
                            <Icon name="person" />
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        );
    }
}