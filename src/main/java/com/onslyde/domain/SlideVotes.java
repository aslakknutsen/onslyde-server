package com.onslyde.domain;

// Generated Jun 15, 2012 8:41:06 AM by Hibernate Tools 3.4.0.CR1

import org.codehaus.jackson.annotate.JsonIgnore;

import javax.persistence.*;
import java.util.Date;

import static javax.persistence.GenerationType.IDENTITY;

/**
 * SlideVotes generated by hbm2java
 */
@Entity
@Table(name = "slide_votes", catalog = "onslyde")
public class SlideVotes implements java.io.Serializable {

	private Integer id;
	private SlideOptions slideOptions;
	private Slide slide;
	private Attendee attendee;
	private Date voteTime;

	public SlideVotes() {
	}

	public SlideVotes(SlideOptions slideOptions,
                      Slide slide, Attendee attendee, Date voteTime) {
		this.slideOptions = slideOptions;
		this.slide = slide;
		this.attendee = attendee;
		this.voteTime = voteTime;
	}

	@Id
	@GeneratedValue(strategy = IDENTITY)
	@Column(name = "id", unique = true, nullable = false)
	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "option_id", nullable = false)
	public SlideOptions getSlideOptions() {
		return this.slideOptions;
	}

	public void setSlideOptions(SlideOptions slideOptions) {
		this.slideOptions = slideOptions;
	}

    @JsonIgnore
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "slide_id", nullable = false)
	public Slide getSlide() {
		return this.slide;
	}

	public void setSlide(Slide slide) {
		this.slide = slide;
	}

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "attendee_id", nullable = false)
	public Attendee getAttendee() {
		return this.attendee;
	}

	public void setAttendee(Attendee attendee) {
		this.attendee = attendee;
	}

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "vote_time", nullable = false, length = 19)
	public Date getVoteTime() {
		return this.voteTime;
	}

	public void setVoteTime(Date voteTime) {
		this.voteTime = voteTime;
	}

}
