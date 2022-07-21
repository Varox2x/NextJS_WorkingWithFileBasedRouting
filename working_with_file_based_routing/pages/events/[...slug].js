import {useRouter} from "next/router";
import {getFilteredEvents} from "../../dummy-data";
import EventList from "../../components/events/event-list";
import ResultsTitle from "../../components/events/results-title";
import {Fragment} from "react";
import Button from "../../components/events/ui/button";
import ErrorAlert from "../../components/events/ui/error-alert";

function FilteredEventsPage() {
    const router = useRouter();

    const filterData = router.query.slug;

    if(!filterData){
        return <p className='center'>Loading . . .</p>;
    }

    const filterYear = filterData[0];
    const filterMonth= filterData[1];

    const numYear = +filterYear;
    const numMonth = +filterMonth;

    if(isNaN(numMonth) || isNaN(numYear) || numYear > 2030 || numYear < 2021 || numMonth < 1 || numMonth > 12){
        return <p>Invalid filter. Error!</p>
    }

    const filteredEvents = getFilteredEvents({
        year: numYear,
        month: numMonth
    });

    if (!filteredEvents || filteredEvents.length === 0){
        return (
            <Fragment>
                <ErrorAlert>
                    <p>No Events found</p>
                </ErrorAlert>
                <div className='center'>
                    <Button link='/events'>Show All Events</Button>
                </div>
            </Fragment>
        )
    }

    const date = new Date(numYear, numMonth -1);

    return (
        <Fragment>
            <ResultsTitle date={date}/>
            <EventList items={filteredEvents}/>
        </Fragment>
    )
}

export default FilteredEventsPage;