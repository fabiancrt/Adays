
TIMEOUT=120
QUIET=0
HOST="$1"
PORT="$2"

echoerr() {
  if [ "$QUIET" -ne 1 ]; then echo "$@" 1>&2; fi
}

usage() {
  cat << USAGE >&2
Usage:
  $0 host port [-t timeout] [-- command args]
  -q | --quiet                        Do not output any status messages
  -t TIMEOUT | --timeout=timeout      Timeout in seconds, zero for no timeout
  -- COMMAND ARGS                     Execute command with args after the test finishes
USAGE
  exit 1
}

wait_for() {
  if [ "$TIMEOUT" -gt 0 ]; then
    echoerr "$0: waiting $TIMEOUT seconds for $HOST:$PORT"
  else
    echoerr "$0: waiting for $HOST:$PORT without a timeout"
  fi
  start_ts=$(date +%s)
  while :
  do
    if [ "$ISBUSY" -eq 1 ]; then
      nc -z "$HOST" "$PORT"
      result=$?
    else
      (echo > /dev/tcp/"$HOST"/"$PORT") >/dev/null 2>&1
      result=$?
    fi
    if [ $result -eq 0 ] ; then
      end_ts=$(date +%s)
      echoerr "$0: $HOST:$PORT is available after $((end_ts - start_ts)) seconds"
      break
    fi
    sleep 1
  done
  return $result
}

wait_for_wrapper() {
  # In order to support SIGINT during timeout: http://unix.stackexchange.com/a/57692
  if [ "$QUIET" -eq 1 ]; then
    timeout "$TIMEOUT" "$0" "$HOST" "$PORT" --quiet &
  else
    timeout "$TIMEOUT" "$0" "$HOST" "$PORT" &
  fi
  PID=$!
  trap "kill -INT -$PID" INT
  wait $PID
  RESULT=$?
  if [ $RESULT -ne 0 ]; then
    echoerr "$0: timeout occurred after waiting $TIMEOUT seconds for $HOST:$PORT"
  fi
  return $RESULT
}

# Check to see if timeout is from busybox?
TIMEOUT_PATH=$(realpath $(which timeout))
ISBUSY=0
if [ "$TIMEOUT_PATH" != "/usr/bin/timeout" ]; then
  ISBUSY=1
fi

while [ $# -gt 0 ]
do
  case "$1" in
    *:* )
    HOST=$(printf "%s\n" "$1"| cut -d : -f 1)
    PORT=$(printf "%s\n" "$1"| cut -d : -f 2)
    shift 1
    ;;
    -q | --quiet)
    QUIET=1
    shift 1
    ;;
    -t)
    TIMEOUT="$2"
    if [ "$TIMEOUT" = "" ]; then break; fi
    shift 2
    ;;
    --timeout=*)
    TIMEOUT="${1#*=}"
    shift 1
    ;;
    --)
    shift
    break
    ;;
    --help)
    usage
    ;;
    *)
    echoerr "Unknown argument: $1"
    usage
    ;;
  esac
done

if [ "$HOST" = "" ] || [ "$PORT" = "" ]; then
  echoerr "Error: you need to provide a host and port to test."
  usage
fi

wait_for

shift $((OPTIND-1))

if [ "$#" -gt 0 ]; then
  exec "$@"
else
  exit 0
fi