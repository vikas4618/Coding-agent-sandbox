FROM ubuntu:22.04
ENV DEBIAN_FRONTEND=noninteractive
RUN apt-get update && apt-get install -y \
    python3 python3-pip \
    nodejs npm \
    x11vnc xvfb fluxbox wget curl net-tools \
    xdotool \
    git nano \
    supervisor \
    && rm -rf /var/lib/apt/lists/*
RUN mkdir -p /opt/novnc && \
    git clone https://github.com/novnc/noVNC.git /opt/novnc && \
    git clone https://github.com/novnc/websockify /opt/novnc/utils/websockify
RUN pip3 install notebook
RUN mkdir ~/.vnc && \
    x11vnc -storepasswd 1234 ~/.vnc/passwd
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf
EXPOSE 8080
CMD ["/usr/bin/supervisord"]
