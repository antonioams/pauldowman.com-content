Here's a simple recipe, with [complete code available on Github][10] (written
in Ruby), to automatically back up your MySQL database to [Amazon's S3 storage
service][11], with regular incremental backup.

   [10]: https://github.com/pauldowman/pauldowman.com-content/tree/master/pages/2009-02-08-mysql-s3-backup
   [11]: http://aws.amazon.com/s3/

_This article appears in [The S3 Cookbook][12], an e-book written by [Scott
Patten][13]. It is is based on the automatic MySQL backup in [EC2 on
Rails][14]._

   [12]: http://pauldowman.com/2009/06/29/the-s3-cookbook/
   [13]: http://www.spattendesign.com/
   [14]: http://ec2onrails.rubyforge.org/

### Solution

You might expect that you could simply upload the MySQL database files to S3.
That could work if all your tables were MyISAM tables (assuming you did [LOCK
TABLES][15] and [FLUSH TABLES][16] to make sure the database files were in a
consistent state), but it won't work for [InnoDB][17] tables. A more general
approach is to use the [mysqldump][18] tool to back up the full contents of
the database and then use MySQL's [binary log][19] for incremental backups.

   [15]: http://dev.mysql.com/doc/refman/5.0/en/lock-tables.html
   [16]: http://dev.mysql.com/doc/refman/5.0/en/flush.html
   [17]: http://dev.mysql.com/doc/refman/5.0/en/innodb.html
   [18]: http://dev.mysql.com/doc/refman/5.0/en/mysqldump.html
   [19]: http://dev.mysql.com/doc/refman/5.0/en/binary-log.html

The binary log contains all changes to the database that are made since the
last full backup, so to restore the database you first restore the full backup
(the output from mysqldump) and then apply the changes from the binary log.

Here are Ruby scripts for doing the full backup, incremental backup, and
restore.

The full backup script uses [mysqldump][20] to do the initial full backup and
uploads it's output to S3. It assumes the bucket is empty.

   [20]: http://dev.mysql.com/doc/refman/5.0/en/mysqldump.html

{{full_backup.rb | download}}:
{{full_backup.rb | code(ruby)}}

Once the full backup has been done, the following script can be run frequently
(perhaps every 5 or 10 minutes) to rotate the binary log and upload it to S3.
It must be run by a user that has read access to the MySQL binary log (see the
Discussion section for details on configuring the MySQL binary log path).

{{incremental_backup.rb | download}}:
{{incremental_backup.rb | code(ruby)}}

The following script restores the full backup (mysqldump output) and the
subsequent binary log files. It assumes the database exists and is empty.

{{restore.rb | download}}:
{{restore.rb | code(ruby)}}

The previous three scripts (full_backup.rb, incremental_backup.rb,
and restore.rb) all include config.rb which contains all user-
specific configuration and common.rb which defines some common
functions:

{{config.rb | download}}:
{{config.rb | code(ruby)}}

{{common.rb | download}}:
{{common.rb | code(ruby)}}

### Discussion

To enable binary logging make sure that the MySQL config file (my.cnf) has the
following line in it:
    
{{my.cnf | code(plain)}}

The path (/var/db/mysql/binlog) can be any directory that MySQL can write to,
but it needs to match the value of `@mysql_bin_log_dir` in config.rb.

Note for EC2 users: The root volume ("/") has limited space, it's a good idea
to use /mnt for your MySQL data files and logs.

The MySQL user needs to have the "RELOAD" and the "SUPER" privileges, these
can be granted with the following SQL commands (which need to be executed as
the MySQL root user):

{{grants.sql | code(sql)}}

(Replace user_name with the value of @mysql_user in config.rb).

You'll probably want to perform the full backup on a regular schedule, and the
incremental backup on a more frequent schedule, but the relative frequency of
each will depend on how large your database is, how frequently it's updated,
and how important it is to be able to restore quickly.  This is because for a
large database mysqldump can be slow and can increase the system load
noticeably, while rotating the binary log is quick and inexpensive to perform.
But if your database changes normally contain many updates (as opposed to just
inserts) it can be slower to restore from the binary logs.

To have the backups run automatically you could add something like the
following to your crontab file, adjusting the times as necessary:

{{crontab | code(text)}}

Before this can work however, two small details must be taken care of, which
have been left as an exercise for the reader:

  1. When the full backup runs it should delete any binary log files that might already exist in the bucket. Otherwise the restore will try to restore them even though they're older than the full backup.
  2. The execution of the scripts should not overlap. If the full backup hasn't finished before the incremental starts (or vice versa) the backup will be in an inconsistent state.

