import React from "react";
import { Button, Icon } from "semantic-ui-react";
import { Grid } from "semantic-ui-react";

const GoalsTable = props => {
    return (
        <div>
            <Grid columns={7}>
                <Grid.Column>{props.id}</Grid.Column>
        <Grid.Column>{props.value.date}</Grid.Column>
                <Grid.Column>{props.value.category}</Grid.Column>
                <Grid.Column>{props.value.currency}</Grid.Column>
                <Grid.Column>
                    <Button
                        icon
                        floated="right"
                        onClick={() => props.editTransaction(props.id)}
                    >
                        {" "}
                        <Icon name="edit" />
                    </Button>{" "}
                    <Button
                        icon
                        floated="right"
                        onClick={() => props.deleteTransaction(props.id)}
                    >
                        {" "}
                        <Icon name="delete" />
                    </Button>
                </Grid.Column>
            </Grid>
        </div>
    );
};

export default GoalsTable;
