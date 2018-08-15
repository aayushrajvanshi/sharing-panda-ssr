import React from 'react';
import Posts from '../../components/Common/Posts';

const FundraiserDetailPage = ({ match }) => (
    <div>
        Fundraiser Detail: {match.params.fundraiserId}
        <Posts />
    </div>
)

export default FundraiserDetailPage