﻿// <auto-generated />
using System;
using ContactCenter.API.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace ContactCenter.API.Migrations
{
    [DbContext(typeof(ContactCenterContext))]
    [Migration("20250224083223_InitialCreate")]
    partial class InitialCreate
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "9.0.2");

            modelBuilder.Entity("ContactCenter.API.Models.Agent", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<DateTime>("LastStatusChange")
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<int>("Status")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.ToTable("Agents");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            LastStatusChange = new DateTime(2025, 2, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Name = "Agent 1",
                            Status = 0
                        },
                        new
                        {
                            Id = 2,
                            LastStatusChange = new DateTime(2025, 2, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Name = "Agent 2",
                            Status = 1
                        });
                });

            modelBuilder.Entity("ContactCenter.API.Models.Client", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<DateTime>("JoinedQueue")
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<int>("WaitTime")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.ToTable("Clients");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            JoinedQueue = new DateTime(2025, 2, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Name = "Client 1",
                            WaitTime = 5
                        },
                        new
                        {
                            Id = 2,
                            JoinedQueue = new DateTime(2025, 2, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Name = "Client 2",
                            WaitTime = 10
                        });
                });
#pragma warning restore 612, 618
        }
    }
}
