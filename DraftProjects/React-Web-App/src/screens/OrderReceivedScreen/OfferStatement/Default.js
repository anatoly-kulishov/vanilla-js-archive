import React, {memo, useMemo} from 'react';
import moment from "moment";
import LinkBack from "../../../components/LinkBack";
import {useSelector} from "react-redux";
import {getAllTasks} from "../../../store/selectors/tasks-selectors";

const Default = props => {
    const {order} = props.data;

    const tasks = useSelector(getAllTasks);
    const Task = useMemo(() => tasks.filter(el => el.id === order?.Task?.PresetTaskId)?.[0], [order, tasks]);
    const TaskSkills = useMemo(() => Task?.Skills.filter(skill => order.EventSkills.some(eventSkill => eventSkill.SkillId === skill.id)), [order, Task]);

    const startDate = moment(order?.start).format('D. MMMM YYYY');
    const endDate = moment(order?.end).format('D. MMMM YYYY');
    const diffHoursTime = moment(moment(order?.end) - moment(order?.start)).utc().format('HH:mm');
    const printHandler = () => window.print();


    return (
        <>
            <div className="row">
                <div className="col-12">
                    <LinkBack title="Back to Event listing"/>
                    <div className="d-flex flex-wrap align-items-center justify-content-between">
                        <div className="title-box mt-3">
                            <h1 className="title title-small">{order?.JobRole?.Location?.CompanyAccount?.name}</h1>
                            {order.lockedAt && (
                                <span className="title-badge title-badge--locked ml-md-3">
                                    {order.LastLocker?.firstName} {order.LastLocker?.lastName}
                                </span>
                            )}
                            {order?.status && (
                                <span
                                    className={`title-badge title-badge--${(order.status === 'canceled' || order.status === 'failed') ? 'warning' : null} ml-3`}>
                                Status: {order.status[0].toUpperCase() + order.status.substring(1)}
                            </span>
                            )}
                        </div>
                        <div className="actions mt-4 mt-md-3">
                            <span onClick={printHandler} className="icon save-pdf"/>
                            <span onClick={printHandler} className="icon print"/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row mt-4">
                <div className="col-12">
                    <div className="white-shadow-box mb-1">
                        <div className="info-cols">
                            <div className="info-col">
                                <span className="info-col__label">Task</span>
                                <strong className="info-col__title">{Task && Task?.name}</strong>
                            </div>
                            <div className="info-col">
                                <span className="info-col__label">Location</span>
                                <strong
                                    className="info-col__title">{order?.JobRole?.Location?.name}</strong>
                            </div>
                            <div className="info-col">
                                <span className="info-col__label">Address</span>
                                <strong
                                    className="info-col__title">
                                    {`${order?.JobRole?.Location?.address_Street}, ${order?.JobRole?.Location?.address_City}`}
                                </strong>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12">
                    <div className="white-shadow-box mb-1">
                        <div className="info-cols">
                            <div className="info-col">
                                <span className="info-col__label">Date</span>
                                <strong className="info-col__title">
                                    {`${startDate} ${(startDate !== endDate) ? `- ${endDate}` : ''}`}
                                </strong>
                            </div>
                            <div className="info-col">
                                <span className="info-col__label">Start time</span>
                                <strong
                                    className="info-col__title">{moment(order?.start).format('LT')}</strong>
                            </div>
                            <div className="info-col">
                                <span className="info-col__label">End time</span>
                                <strong
                                    className="info-col__title">{moment(order?.end).format('LT')}</strong>
                            </div>
                            <div className="info-col">
                                <span className="info-col__label">Length</span>
                                <strong className="info-col__title">
                                    {diffHoursTime}
                                </strong>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12">
                    <div className="white-shadow-box mb-1">
                        <div className="info-cols">
                            <div className="info-col">
                                <span className="info-col__label">Required skills</span>
                                <div className="required-skills mt-2">
                                    {TaskSkills?.map(skill => (
                                        <div key={skill.id} className="required-skills">
                                            <div className="skill-box pr-2">{skill.name}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="info-col">
                                <span className="info-col__label">Description</span>
                                <div className="info-col__title info-col__title--textarea">
                                    {order?.JobOrder?.description}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default memo(Default);
