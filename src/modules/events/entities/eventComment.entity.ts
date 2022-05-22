import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { CommentEntity } from "./comment.entity";
import { EventEntity } from "./event.entity";


@Entity('eventComments')
export class EventCommentEntity {
    @PrimaryColumn()
    id: number;

    @Column({
        type: "int",
        nullable: false,
    })
    eventId: number;

    @ManyToOne(() => EventEntity, {
        onDelete: "CASCADE",
    })
    event: EventEntity;

    @Column({
        type: "int",
        nullable: false,
    })
    commentId: number;

    @ManyToOne(() => CommentEntity, {
        onDelete: "CASCADE",
    })
    comment: CommentEntity;
}