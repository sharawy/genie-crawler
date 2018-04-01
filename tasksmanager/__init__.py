from django.utils.translation import pgettext_lazy


class TaskStatus:
    STARTED = 'started'
    INITIATED = 'initiated'
    FINISHED = 'finished'
    ERROR = 'error'
    CANCELED = 'canceled'
    PENDING = 'pending'
    RUNNING = 'running'

    CHOICES = [
        (STARTED, pgettext_lazy('task status', 'Task is running')),
        (INITIATED, pgettext_lazy('task status', 'Task is initiated')),
        (FINISHED, pgettext_lazy('task status', 'Task is finished')),
        (ERROR, pgettext_lazy('task status', 'Task is raised an error')),
        (CANCELED, pgettext_lazy('task status', 'Task is canceled')),
        (PENDING, pgettext_lazy('task status', 'Task is pending')),
        (RUNNING, pgettext_lazy('task status', 'Task is running')),
    ]


class ExportType:
    CSV = 'csv'
    JSON = 'json'
    SQL = 'sql'
    XML = 'xml'

    CHOICES = [
        (CSV, pgettext_lazy('Export Type', 'CSV')),
        (JSON, pgettext_lazy('Export Type', 'JSON')),
        (SQL, pgettext_lazy('Export Type', 'SQL')),
        (XML, pgettext_lazy('Export Type', 'XML')),

    ]
