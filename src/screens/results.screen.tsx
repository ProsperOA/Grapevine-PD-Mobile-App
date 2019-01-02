import * as React from 'react';
import { ActivityIndicator, Image, View, Dimensions, ScrollView, Text } from 'react-native';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Button, Header, List, ListItem } from 'react-native-elements';
import { NavigationScreenProps } from 'react-navigation';


import * as actions from '../store/actions';
import { PRIMARY } from '../shared/styles';
import { AppState } from '../store/reducers';

interface ResultsScreenProps extends NavigationScreenProps {
  loading: boolean;
  results: any;
  analyzeImage: (image: any) => Dispatch<actions.AnalyzeImageAction>;
}

interface ResultsScreenState {
  resultsList: any[];
};

class ResultsScreen extends React.Component<ResultsScreenProps, ResultsScreenState> {
  state: Readonly<ResultsScreenState> = {
    resultsList: []
  };

  public componentDidMount(): void {
    this.setResultsState(this.props.results);
  }

  public componentWillReceiveProps(nextProps: ResultsScreenProps): void {
    this.setResultsState(nextProps.results);
  }

  public setResultsState = (results: {[key: string]: number}) => {
    const newResultsList: any[] = [];

    Object.keys(results).map((key: string, i: number) => {
      newResultsList.push({
        name: key,
        value: results[key]
      });
    });

    this.setState({ resultsList: newResultsList });
  };

  public onAnalyzeImage = (): void => {
    if (this.props.loading) return;

    const uri: string = this.props.navigation.getParam('uri');
    const image = {
      uri,
      type: 'image/jpeg',
      name: 'image.jpeg'
    };

    this.props.analyzeImage(image);
  };

  public render(): JSX.Element {
    const imageURI: string = this.props.navigation.getParam('uri');
    const { resultsList } = this.state;

    let results = (
      <ScrollView style={{ flex: 1 }}>
        <List style={{ height: '100%' }}>
          {
            resultsList.map((r: any, index: number) => (
              <ListItem
                key={index}
                title={r.name}
                titleStyle={{ fontWeight: 'bold' }}
                rightTitle={
                  r.value < 1 ? '< 1%' : `${Math.round(r.value)}%`
                }
                rightTitleStyle={{ fontWeight: 'bold' }}
                hideChevron={true}
                wrapperStyle={{ height: 20 }}
              />
            ))
          }
        </List>
      </ScrollView>
    );

    if (this.props.loading) {
      results = (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color={PRIMARY} />
        </View>
      );
    }

    return (
      <View style={{ flex: 1 }}>
        <Header
          outerContainerStyles={{ backgroundColor: PRIMARY, borderBottomColor: PRIMARY }}
          centerComponent={{ text: 'Grapevine PD', style: { color: '#fff', fontSize: 20, fontWeight: '600' } }} />
        <View style={{ flex: 1 }}>
          <View style={{ flex: 0.40 }}>
            <Image
              style={{ height: '100%', width: Dimensions.get('window').width }}
              source={{ uri: imageURI }} />
          </View>
          <View style={{ flex: 0.60, paddingTop: 15, paddingBottom: 15 }}>
            {results}
            <View style={{ flex: 0.5, alignContent: 'flex-end', justifyContent: 'flex-end' }}>
              <Button
                title="Analyze"
                backgroundColor={PRIMARY}
                style={{ marginBottom: 20 }}
                onPress={this.onAnalyzeImage}
                raised />
              <Button
                title="Cancel"
                onPress={() => this.props.navigation.navigate('HomeScreen')}
                raised />
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = ({ analyzeImage }: AppState) => ({ ...analyzeImage });

const mapDispatchToProps = (dispatch: Dispatch<actions.AnalyzeImageAction>) => ({
  analyzeImage: (image: any) => dispatch(actions.analyzeImage(image)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ResultsScreen)